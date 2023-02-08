# 手撸Java提取QSV文件视频内容

QSV文件的构成详见上一篇文章，这篇文章带你手把手撸一遍代码。

## 创建类

第一步新建一个java类`QSV`，构造函数传入需要解析的文件名称。

```java
public class QSV {
    
    private RandomAccessFile randomAccessFile;
    private String name;

    public QSV(String name) throws FileNotFoundException {
        randomAccessFile = new RandomAccessFile(name, "r");
        this.name = name;
    }

}

```

## 通用方法

### 逐字节读取文件

我们需要逐个字节读取文件，这边就需要jdk自带的类`RandomAccessFile`，先定义一个通用函数，输出偏移位置和字节大小获取字节数组。

```java
/**
* @param offset 偏移未知
* @param size   字节大小
* @return 字节数组
* @throws IOException
*/
private byte[] getByteFromFile(int offset, int size) throws IOException {
    //指针移动至偏移位置
    randomAccessFile.seek(offset);
    //需要读取的字节数
    byte[] bs = new byte[size];
    randomAccessFile.read(bs);
    return bs;
}
```

### 字节数组转16进制字符串

```java
private static final char[] HEX_VOCABLE = {'0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
/**
* 字节数组转16进制字符串
*
* @param bs
* @return
*/
public String bytesToHex(byte[] bs) {
    StringBuilder sb = new StringBuilder();
    for (byte b : bs) {
        int high = (b >> 4) & 0x0f;
        int low = b & 0x0f;
        sb.append(HEX_VOCABLE[high]);
        sb.append(HEX_VOCABLE[low]);
    }
    return sb.toString();
}
```

### 字节数组转int

```java
/**
* 字节数组转int
*
* @param b
* @return
*/
public int toInt(byte[] b) {
    int res = 0;
    for (int i = 0; i < b.length; i++) {
        res += (b[i] & 0xff) << (i * 8);
    }
    return res;
}
```

## 老版本解密算法

老版本解密方法比较简单，先看下C的写法：

```c
// 定义1个字节内存
typedef uint8_t BYTE;
// 定义4个字节内存
typedef uint32_t DWORD;
// decryption algorithm for some segments in qsv version 0x1
void decrypt_1(BYTE* buffer, DWORD size) {
    static BYTE dict[] = {0x62, 0x67, 0x70, 0x79};
    for(int i = 0; i < size; ++i) {
        DWORD j = ~i & 0x3;
        buffer[i] ^= dict[j];
    }
}
```

可以直接用byte数组和long类型替换c的内存定义，这边没问题时因为没有位移算法，后面新版本解密算法会讲到。

```java
private void decrypt_1(byte[] bs, long len) {
    byte[] b = new byte[]{0x62, 0x67, 0x70, 0x79};
    for (int i = 0; i < len; i++) {
        //先取反再与运算
        int j = ~i & 0x3;
        //异或运算
        bs[i] ^= b[j];
    }
}
```

## 新版本解密算法

新版本解密算法比较复杂，同样先看下c的写法：

```c
// 定义1个字节内存
typedef uint8_t BYTE;
// 定义4个字节内存
typedef uint32_t DWORD;
// decryption algorithm for some segments in qsv version 0x2
void decrypt_2(BYTE* buffer, DWORD size) {
    DWORD x = 0x62677079;
    for(DWORD i = size - 1; i != 0; --i) {
        x = (x << 1) | (x >> 31);
        x ^= buffer[i];
    }
    for(DWORD i = 1; i < size; ++i) {
        x ^= buffer[i] & 0xFF;
        x = (x >> 1) | (x << 31);
        DWORD j = x % i;
        BYTE tmp = buffer[j];
        buffer[j] = tmp ^ (BYTE)~buffer[i];
        buffer[i] = tmp;
    }
}
```

这边注意c的写法有位移，定义的`DWORD`占32位内存，而java与之对应的`int`类型也是占32位内存，取值范围是`-2^31~2^31-1`(即`-2147483648~2147483647`)，如果超出这个范围java需要用long，而long占64位内存取反和位移都是按64位进行的与C的32位取反位移计算结果肯定有差异。

比如：2147483648，转换位二进制表示：10000000000000000000000000000000，C的写法由于`DWORD`占32位内存，左移一位后超出32为故就变成00000000000000000000000000000000，而java已经超出了int的取值范围，只能用long定义，由于long占64位，左移一位不会超出，结果也就不一样了。

又比如：9147483648，转为二进制表示：1000100001001110111000011000000000，已经超出32位，存到`DWORD`中的只保留右边的32位，即00100001001110111000011000000000，左移以为变成01000010011101110000110000000000，转为10进制为1115098112，而java采用long定义不会超出64位，左移结果位10001000010011101110000110000000000，转为十进制表示为18294967296，与C的结果相差较大。那么有办法解决吗，答案肯定是有的，我们需要重新写一个位移算法。

```java
/**
* 左移
*
* @param value long
* @param i     位移量
* @return long
*/
private long longLeftShift(long value, int i) {
    String binary = format32(value);
    binary = binary.substring(i) + String.format("%0" + i + "d", 0);
    return Long.parseLong(binary, 2);
}

/**
* 右移
*
* @param value long
* @param i     位移量
* @return long
*/
private long longRightShift(long value, int i) {
    String binary = format32(value);
    binary = String.format("%0" + i + "d", 0) + binary.substring(0, binary.length() - i);
    return Long.parseLong(binary, 2);
}

private String format32(long value) {
    String binary = Long.toBinaryString(value);
    if (binary.length() < 32) {
        //补满32位
        binary = String.format("%0" + (32 - binary.length()) + "d", 0) + binary;
    } else {
        //多余的截取掉
        binary = binary.substring(binary.length() - 32);
    }
    return binary;
}
```

有了新定义的位移算法，解密算法就可以修改为：

```java
private void decrypt_2(byte[] buffer, int size) {
    long x = 0x62677079;
    for (int i = size - 1; i != 0; --i) {
        x = longLeftShift(x, 1) | longRightShift(x, 31);
        x ^= buffer[i] & 0xFF;
    }
    for (int i = 1; i < size; ++i) {
        x ^= buffer[i] & 0xFF;
        x = longRightShift(x, 1) | longLeftShift(x, 31);
        int j = (int) (x % i);
        byte tmp = buffer[j];
        int a = buffer[i];
        buffer[j] = (byte) (tmp ^ ~a);
        buffer[i] = tmp;
    }
}
```

## 获取QSV头部信息

上一篇文章讲到，头部信息共90个字节，`signature`(10byte)+`version`(4byte)+`vid`(16byte)+`_unknown1`(4byte)+`_unknown2`(32byte)+`_unknown3`(4byte)+`_unknown4`(4byte)+`json_offset`(8byte)+`json_size`(4byte)+`nb_indices`(4byte)

```java
public static void main(String[] args) throws IOException {
    QSV qsv = new QSV("D:\\workspace\\c\\风吹半夏第1集-蓝光1080P.qsv");
    qsv.readHead();
    qsv.close();
}

public void readHead() throws IOException {
    //signature:10byte
    byte[] signature = getByteFromFile(0x0, 0xA);
    //version:4byte
    byte[] version = getByteFromFile(0xA, 0x4);
    //vid:16byte
    byte[] vid = getByteFromFile(0xE, 0x10);
    //_unknown1:4byte
    byte[] _unknown1 = getByteFromFile(0x1E, 0x4);
    //_unknown2:32byte
    byte[] _unknown2 = getByteFromFile(0x22, 0x20);
    //_unknown3:4byte
    byte[] _unknown3 = getByteFromFile(0x42, 0x4);
    //_unknown4:4byte
    byte[] _unknown4 = getByteFromFile(0x46, 0x4);
    //json_offset:8byte
    byte[] json_offset = getByteFromFile(0x4A, 0x8);
    //json_size:4byte
    byte[] json_size = getByteFromFile(0x52, 0x4);
    //nb_indices:4byte
    byte[] nb_indices = getByteFromFile(0x56, 0x4);
    System.out.println(String.format("signature:%s\nversion:%s\nvid:%s\n_unknown1:%s\n_unknown2:%s\n_unknown3:%s\n_unknown4:%s\njson_offset:0x%s\njson_size:0x%s\nnb_indices:0x%s",
            new String(signature), toInt(version), bytesToHex(vid), bytesToHex(_unknown1), bytesToHex(_unknown2), bytesToHex(_unknown3),
            bytesToHex(_unknown4), Integer.toHexString(toInt(json_offset)), Integer.toHexString(toInt(json_size)), Integer.toHexString(toInt(nb_indices))));
}
```

运行结果：

```txt
signature:QIYI VIDEO
version:2
vid:A90EA47D4333331BB85F331C1130504C
_unknown1:01000000
_unknown2:0000000000000000000000000000000000000000000000000000000000000000
_unknown3:01000000
_unknown4:01000000
json_offset:0x167
json_size:0x1d81
nb_indices:0x7
```

## 获取json数据

获取json数据需要先获取头部信息记录的json的偏移位置和字节大小，获取到的字节数组再通过老版本解密算法解密即可。

```java

public static void main(String[] args) throws IOException {
    QSV qsv = new QSV("D:\\workspace\\c\\风吹半夏第1集-蓝光1080P.qsv");
    qsv.readJson();
    qsv.close();
}

public void readJson() throws IOException {
    //json_offset:8byte
    byte[] json_offset = getByteFromFile(0x4A, 0x8);
    //json_size:4byte
    byte[] json_size = getByteFromFile(0x52, 0x4);
    //json
    byte[] bs = getByteFromFile(toInt(json_offset), toInt(json_size));
    decrypt_1(bs, bs.length);
    System.out.println(String.format("json_offset:0x%s\njson_size:0x%s", Integer.toHexString(toInt(json_offset)), Integer.toHexString(toInt(json_size))));
    System.out.println(new String(bs, StandardCharsets.UTF_8));
}
```

运行结果：

```txt
json_offset:0x167
json_size:0x1d81
QYVI   {"qsv_info":{"ad":{},"aid":"3644740799867701","bid":600,"dr":-1,"independentaudio":true,"m3u8":"","pano":{"type":1},"qsvinfo_version":2,"sdv":"","st":"","thdt":1,"tht":0,"title":"","title_tail_info":{"bt":99,"bts":-1,"et":2621,"ete":-1,"fe":1,"le":0},"tvid":"3185901936393500","vd":{"seg":{"duration":["376140","365508","370300","371477","368311","368308","554319"],"rid":["a8c47c2906b88ae47e8503c96dae0494","4c8578cecbdfa3137a61b7e2bd1c68dc","4bc76f9b4d4ce995f40b42c467d206f8","8ed13ccd56aa2367f5eaabee12043d89","247b4612415c5b452f5965894a967e19","309400bef063cfd6baf19feb0d4a73a9","9771b1042cabfc9828767a3d0350f655"],"size":["75624801","84329329","90135782","82093900","91974933","75298884","111399115"]},"time":{"et":"2621000","st":"99000"}},"vi":"{\"writer\":\"\",\"authors\":\"\",\"upOrder\":36,\"rewardAllowed\":0,\"fl\":[],\"allowEditVVIqiyi\":0,\"isPopup\":1,\"payMark\":0,\"an\":\"风吹半夏\",\"pvu\":\"\",\"subType\":1,\"rewardMessage\":\"\",\"ipLimit\":1,\"pubTime\":\"1673306651000\",\"mainActorRoles\":[],\"up\":\"2023-01-17 20:20:02\",\"un\":\"\",\"qiyiProduced\":1,\"platforms\":[],\"vn\":\"风吹半夏第1集\",\"plc\":{\"4\":{\"downAld\":1,\"coa\":1},\"40\":{\"downAld\":1,\"coa\":1},\"10\":{\"downAld\":1,\"coa\":1},\"5\":{\"downAld\":1,\"coa\":1},\"41\":{\"downAld\":1,\"coa\":1},\"22\":{\"downAld\":1,\"coa\":1},\"32\":{\"downAld\":1,\"coa\":1},\"11\":{\"downAld\":1,\"coa\":1},\"12\":{\"downAld\":1,\"coa\":1},\"7\":{\"downAld\":1,\"coa\":1},\"13\":{\"downAld\":1,\"coa\":1},\"14\":{\"downAld\":1,\"coa\":1},\"91\":{\"downAld\":1,\"coa\":1},\"34\":{\"downAld\":1,\"coa\":1},\"9\":{\"downAld\":1,\"coa\":1},\"6\":{\"downAld\":1,\"coa\":1},\"16\":{\"downAld\":1,\"coa\":1},\"17\":{\"downAld\":1,\"coa\":1},\"27\":{\"downAld\":1,\"coa\":1},\"28\":{\"downAld\":1,\"coa\":1},\"18\":{\"downAld\":1,\"coa\":1},\"29\":{\"downAld\":1,\"coa\":1},\"1\":{\"downAld\":1,\"coa\":1},\"50\":{\"downAld\":1,\"coa\":1},\"31\":{\"downAld\":1,\"coa\":1},\"15\":{\"downAld\":1,\"coa\":1},\"2\":{\"downAld\":1,\"coa\":1},\"3\":{\"downAld\":1,\"coa\":1},\"21\":{\"downAld\":1,\"coa\":1},\"30\":{\"downAld\":1,\"coa\":1},\"19\":{\"downAld\":1,\"coa\":1},\"8\":{\"downAld\":1,\"coa\":1},\"20\":{\"downAld\":1,\"coa\":1}},\"sm\":0,\"st\":200,\"startTime\":99,\"showChannelId\":2,\"vu\":\"http:\\/\\/www.iqiyi.com\\/v_uvxuws1kkw.html\",\"povu\":\"\",\"ppsuploadid\":0,\"qiyiPlayStrategy\":\"非会员每日20:00转免1集\",\"ar\":\"内地\",\"cc\":0,\"videoQipuId\":3185901936393500,\"albumQipuId\":3644740799867701,\"pano\":{\"type\":1},\"subt\":\"许半夏帮童骁骑驱霉运\",\"endTime\":2621,\"cpa\":1,\"userVideocount\":0,\"es\":36,\"plg\":2774,\"stl\":{\"d\":\"http:\\/\\/meta.video.iqiyi.com\",\"stl\":[]},\"subKey\":\"3644740799867701\",\"tvFocuse\":\"赵丽颖欧豪携手创业\",\"qtId\":0,\"ty\":0,\"ppsInfo\":{\"shortTitle\":\"风吹半夏第1集\",\"name\":\"风吹半夏第1集\"},\"sid\":0,\"etm\":\"\",\"keyword\":\"风吹半夏\",\"pturl\":\"\",\"a\":\"\",\"isTopChart\":0,\"idl\":0,\"albumAlias\":\"许半夏帮童骁骑驱霉运\",\"stm\":\"\",\"pd\":1,\"tags\":[],\"coa\":0,\"c\":2,\"producers\":\"\",\"nurl\":\"\",\"tvEname\":\"wild bloom\",\"uid\":\"0\",\"asubt\":\"\",\"d\":\"傅东育|毛溦\",\"vid\":\"a90ea47d4333331bb85f331c1130504c\",\"dts\":\"20230117202002\",\"editorInfo\":\"\",\"tvSeason\":0,\"ntvd\":3185901936393500,\"vpic\":\"http:\\/\\/pic6.iqiyipic.com\\/image\\/20221127\\/e2\\/52\\/v_170312139_m_601_m1.jpg\",\"vType\":0,\"cType\":1,\"payMarkUrl\":\"\",\"apic\":\"http:\\/\\/pic8.iqiyipic.com\\/image\\/20230104\\/6c\\/00\\/a_100498846_m_601_m26.jpg\",\"shortTitle\":\"风吹半夏第1集\",\"tvid\":3185901936393500,\"aid\":3644740799867701,\"au\":\"http:\\/\\/www.iqiyi.com\\/a_yq6d69gtw9.html\",\"tvPhase\":0,\"ifs\":0,\"is\":0,\"tpl\":[],\"actors\":[],\"isVip\":\"\",\"votes\":[],\"previewImageUrl\":\"http:\\/\\/preimage3.iqiyipic.com\\/preimage\\/20230110\\/6a\\/a6\\/v_170312139_m_611_m6.jpg\",\"e\":\"\",\"cnPremTime\":0,\"s\":\"\",\"ma\":\"赵丽颖|欧豪|李光洁|刘威|柯蓝|任重|冯嘉怡|孙千|黄澄澄|是安|宋熹|王西|黄义威|王劲松|刘威葳|尤靖茹|林鹏（大陆男演员）|郝平|淮文|颜世魁|薛淑杰|刘硕|丁冠中|豆艺坤|寇钟吁|杨德民|傅宜箴|朱超艺|黄子琪|荣飞|田玲|周小镔|孔琳|方晓莉|陈创|韩朔|高远\",\"supName\":\"\",\"sc\":0,\"categoryKeywords\":\"电视剧,3644740799867701,0,http:\\/\\/list.iqiyi.com\\/www\\/2\\/------------------.html 自制,12791537149997,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-12791537149997-----------------.html 浙江卫视,20291787825994,0,http:\\/\\/list.iqiyi.com\\/www\\/2\\/------------------.html 家庭,23757144288056,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-23757144288056-----------------.html 言情,23789230921965,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-23789230921965-----------------.html 励志,29717236536467,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-29717236536467-----------------.html 商战,32284167249109,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-32284167249109-----------------.html 剧情,37979544767779,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-37979544767779-----------------.html 都市,80141381722890,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-80141381722890-----------------.html 内地,80526421329786,0,http:\\/\\/list.iqiyi.com\\/www\\/2\\/------------------.html 爱情,87328787718281,2,http:\\/\\/list.iqiyi.com\\/www\\/2\\/-87328787718281-----------------.html\",\"onlineStatus\":1,\"mdown\":0,\"bmsg\":{\"t\":\"20230117202002\",\"f\":\"web\",\"mid\":\"\",\"sp\":\"26173601,\"},\"nvid\":\"8ec7f862076f40ee17c908e2bbc3fae2\",\"flpps\":[],\"supType\":\"\",\"lg\":2,\"is3D\":0,\"bossStatus\":0,\"isDisplayCircle\":0,\"actorRoles\":[],\"exclusive\":1,\"circle\":{\"type\":0,\"id\":0},\"commentAllowed\":1,\"tg\":\"忠犬 大女主 自制 工业强国 毒舌 重组家庭 渣男 浙江卫视 家庭 言情 霸道总裁 御姐 励志 个人成长 虐恋 双强 普通话 商战 硬汉 剧情 出轨 兄弟反目 女强人 爽剧 初恋 青年奋斗 热血 女性励志 群像 个人奋斗 接地气 女青年 大佬 原生家庭 猪队友 都市 内地 组团 爱情\",\"info\":\"1996年的秋天，阳光炫目。许半夏开着一辆桑塔纳，接着刚出狱的童骁骑驶往鹭州出差。一路上童骁骑默默无言，二人之间气氛尴尬。到了酒店后，许半夏的指示很清楚：洗澡，看电视，睡觉，第二天一早，她来接童骁骑一起出差。童骁骑点点头，在许半夏离开后，他开始洗澡，记忆也回到了五年前……\\n1991年的一个雨夜，童骁骑因为急着给妈妈筹医药费，撬了一堆下水井盖，蹬着三轮车拉到了许半夏和小陈的废品站。小陈认定童骁骑就是个骗子，不愿帮忙，但善良的半夏相信童骁骑，给了他钱，并且三个人一大早一起把井盖都送了回去。童骁骑为表感激，愿意替二人做事。许半夏提到当地钢厂有很多废了的下脚料，他们可以去收，但缺一辆大车。于是司机班出身的童骁骑真的把厂里的东风偷偷开了出来，三人摇摇晃晃进了钢厂，挣到了人生的第一桶金，但童骁骑也因为私自用车被厂里开除了。回到废品站的童骁骑心灰意冷，许半夏却安慰道正好，今后他们三个人就一块儿干，而这些钱就是他们的第一笔合伙资金。\",\"supId\":0,\"issueTime\":0,\"dtype\":3,\"producer\":\"\",\"presentor\":[],\"followerCount\":0}","vid":"a90ea47d4333331bb85f331c1130504c","videotype":0}}s
```

## 提取视频信息

获取视频信息，首先要先提取索引信息，根据索引信息中的偏移位置和字节大小获取，获取到的字节数组前1024个字节需要解密，根据头部信息中的`version`判断，如果是1则用老版本算法解密，如果是2则用新版本算法解密。

一个QSV文件包含多段视频数据，已发现的视频格式有flv（旧版客户端）、mpeg-ts（新版客户端）。可以通过前三个字节判断，如果前三个字节转字符串为`FLV`则为`FLV`格式。

```java
public static void main(String[] args) throws IOException {
    QSV qsv = new QSV("D:\\workspace\\c\\风吹半夏第1集-蓝光1080P.qsv");
    qsv.readIndex("D:\\workspace\\c");
    qsv.close();
}

public void readIndex(String outPath) throws IOException {
    //nb_indices
    byte[] nb_indices = getByteFromFile(0x56, 0x4);
    //索引
    //_unknown_flag
    byte[] _unknown_flag = getByteFromFile(0x5A, toInt(nb_indices) + 7 >> 3);
    System.out.println(String.format("nb_indices:0x%s\n_unknown_flag:%s", Integer.toHexString(toInt(nb_indices)), bytesToHex(_unknown_flag)));
    //version:4byte
    byte[] version = getByteFromFile(0xA, 0x4);
    //索引体
    byte[] indices = getByteFromFile(0x5A + (toInt(nb_indices) + 7 >> 3), toInt(nb_indices) * 0x1C);
    for (int i = 0; i < toInt(nb_indices); i++) {
        byte[] indice = new byte[0x1C];
        System.arraycopy(indices, 0x1C * i, indice, 0, 0x1C);
        if (toInt(version) == 1) {
            decrypt_1(indice, indice.length);
        } else if (toInt(version) == 2) {
            decrypt_2(indice, indice.length);
        }
        //索引体
        //_codetable
        byte[] _codetable = new byte[0x10];
        System.arraycopy(indice, 0, _codetable, 0, 0x10);
        //segment_offset
        byte[] segment_offset = new byte[0x8];
        System.arraycopy(indice, 0x10, segment_offset, 0, 0x8);
        //segment_size
        byte[] segment_size = new byte[0x4];
        System.arraycopy(indice, 0x18, segment_size, 0, 0x4);
        System.out.println(String.format("_codetable:%s,segment_offset:0x%s,segment_size:0x%s", bytesToHex(_codetable), Integer.toHexString(toInt(segment_offset)), Integer.toHexString(toInt(segment_size))));
        exportVideo(i + 1, segment_offset, segment_size, outPath);
    }
}

private void exportVideo(int fileindex, byte[] segment_offset, byte[] segment_size, String outPath) throws IOException {
    byte[] file = getByteFromFile(toInt(segment_offset), toInt(segment_size));
    //前1024字节加密
    decrypt_2(file, 1024);
    byte[] head = new byte[0x3];
    System.arraycopy(file, 0, head, 0, 0x3);
    //System.out.println(new String(head));
    String outname = name.substring(name.lastIndexOf(File.separator) + 1);
    String outFile = outPath + File.separator + outname.substring(0, outname.lastIndexOf(".")) + "-第" + fileindex + "段." + new String(head).toLowerCase();
    RandomAccessFile write = new RandomAccessFile(outFile, "rw");
    System.out.println("export:" + outFile);
    write.write(file);
    write.close();
}
```

运行结果：

```txt
nb_indices:0x7
_unknown_flag:7F
_codetable:A8C47C2906B88AE47E8503C96DAE0494,segment_offset:0x1ee8,segment_size:0x481f161
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第1段.flv
_codetable:4C8578CECBDFA3137A61B7E2BD1C68DC,segment_offset:0x4821049,segment_size:0x506c371
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第2段.flv
_codetable:4BC76F9B4D4CE995F40B42C467D206F8,segment_offset:0x988d3ba,segment_size:0x55f5ce6
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第3段.flv
_codetable:8ED13CCD56AA2367F5EAABEE12043D89,segment_offset:0xee830a0,segment_size:0x4e4a74c
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第4段.flv
_codetable:247B4612415C5B452F5965894A967E19,segment_offset:0x13ccd7ec,segment_size:0x57b6d15
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第5段.flv
_codetable:309400BEF063CFD6BAF19FEB0D4A73A9,segment_offset:0x19484501,segment_size:0x47cf844
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第6段.flv
_codetable:9771B1042CABFC9828767A3D0350F655,segment_offset:0x1dc53d45,segment_size:0x6a3d0cb
export:D:\workspace\c\风吹半夏第1集-蓝光1080P-第7段.flv
```

## 参考资料

本文参考开源项目`qsv2flv`，项目地址：<https://github.com/btnkij/qsv2flv.git>

该项目采用`c`语言和`Qt`开发，本文作者根据原理采用`Java`进行了翻写，仅供学习和参考。如果要用于实际应用，请使用原项目提供的工具，可以将`qsv`文件转换为`flv`或`mp4`格式。

工具较大且`github`下载速度较慢，可以直接关注公众号回复QSV获取。

## 往期系列

[​揭秘爱奇艺qsv文件背后的秘密](http://mp.weixin.qq.com/s?__biz=Mzg2Njg5NDQzOQ==&mid=2247483861&idx=1&sn=28235dde16f2694f372d62471cecfed7&chksm=ce4296ddf9351fcbffd2e4c46a8ce519a0920f249e8560b7c7c7086ff6808b843233c609ddd2#rd)

## 后记

最后，`QSV`文件系列有视频解说，可以关注作者抖音号查看。
