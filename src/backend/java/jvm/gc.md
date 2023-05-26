---
title: GC配置
icon: markdown
order: 1
date: 2023-05-26
category:
  - 后端技术
tag:
  - jvm
---

## 参数详解

| 参数名称 | 参数说明 |
| --- | --- |
| -XX:+PrintGCDetails | 输出GC的详细日志 |
| -XX:+PrintGCTimeStamps | 输出GC的时间戳（以基准时间的形式） |
| -Xloggc:../logs/gc.log | 此参数主要定义GC Log 的详细信息。 |
| -XX:UseGCLogFileRotation | Enabled GC log rotation, requires -Xloggc. |
| -XX:NumberOfGCLogFiles=5 | Set the number of files to use when rotating logs, must be >= 1.<br>The rotated log files will use the following naming scheme, `<filename>.0`, `<filename>.1`, ..., `<filename>.n-1.` |
| -XX:GCLogFileSize=100M | The size of the log file at which point the log will be rotated, must be >= 8K. |

## 源码解析

[arguments.cpp](https://github.com/openjdk/jdk8u/blob/jdk8u312-b07/hotspot/src/share/vm/runtime/arguments.cpp)

```c
// check if do gclog rotation
// +UseGCLogFileRotation is a must,
// no gc log rotation when log file not supplied or
// NumberOfGCLogFiles is 0
void check_gclog_consistency() {
  if (UseGCLogFileRotation) {
    if ((Arguments::gc_log_filename() == NULL) || (NumberOfGCLogFiles == 0)) {
      jio_fprintf(defaultStream::output_stream(),
                  "To enable GC log rotation, use -Xloggc:<filename> -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=<num_of_files>\n"
                  "where num_of_file > 0\n"
                  "GC log rotation is turned off\n");
      UseGCLogFileRotation = false;
    }
  }

  if (UseGCLogFileRotation && (GCLogFileSize != 0) && (GCLogFileSize < 8*K)) {
    FLAG_SET_CMDLINE(uintx, GCLogFileSize, 8*K);
    jio_fprintf(defaultStream::output_stream(),
                "GCLogFileSize changed to minimum 8K\n");
  }
}
```

[ostream.cpp](https://github.com/openjdk/jdk8u/blob/jdk8u312-b07/hotspot/src/share/vm/utilities/ostream.cpp)

```c
void gcLogFileStream::rotate_log_impl(bool force, outputStream* out) {
  if (NumberOfGCLogFiles == 1) {
    // rotate in same file
    rewind();
    _bytes_written = 0L;
    jio_snprintf(time_msg, sizeof(time_msg), "File  %s rotated at %s\n",
                 _file_name, os::local_time_string((char *)time_str, sizeof(time_str)));
    write(time_msg, strlen(time_msg));

    if (out != NULL) {
      out->print("%s", time_msg);
    }

    dump_loggc_header();
    return;
  }    
  // rotate file in names extended_filename.0, extended_filename.1, ...,
  // extended_filename.<NumberOfGCLogFiles - 1>. Current rotation file name will
  // have a form of extended_filename.<i>.current where i is the current rotation
  // file number. After it reaches max file size, the file will be saved and renamed
  // with .current removed from its tail.
  _cur_file_num++;
  if (_cur_file_num > NumberOfGCLogFiles - 1) _cur_file_num = 0;
  int result = jio_snprintf(current_file_name,  JVM_MAXPATHLEN, "%s.%d" CURRENTAPPX,
               _file_name, _cur_file_num);
  if (result >= JVM_MAXPATHLEN) {
    warning("Cannot create new log file name: %s: file name is too long.\n", current_file_name);
    return;
  }
}  

gcLogFileStream::gcLogFileStream(const char* file_name) : _file_lock(NULL) {
  _cur_file_num = 0;
  _bytes_written = 0L;
  _file_name = make_log_name(file_name, NULL);

  if (_file_name == NULL) {
    warning("Cannot open file %s: file name is too long.\n", file_name);
    _need_close = false;
    UseGCLogFileRotation = false;
    return;
  }

  // gc log file rotation
  if (UseGCLogFileRotation && NumberOfGCLogFiles > 1) {
    char tempbuf[JVM_MAXPATHLEN];
    jio_snprintf(tempbuf, sizeof(tempbuf), "%s.%d" CURRENTAPPX, _file_name, _cur_file_num);
    _file = fopen(tempbuf, "w");
  } else {
    _file = fopen(_file_name, "w");
  }
  if (_file != NULL) {
    _need_close = true;
    dump_loggc_header();

    if (UseGCLogFileRotation) {
      _file_lock = new Mutex(Mutex::leaf, "GCLogFile");
    }
  } else {
    warning("Cannot open file %s due to %s\n", _file_name, strerror(errno));
    _need_close = false;
  }
}
```

## Try to avoid -XX:+UseGCLogFileRotation

Developers take advantage of the JVM argument -XX:+UseGCLogFileRotation to rotate GC log files.

Example:

```txt
-XX:+PrintGCDetails 
-XX:+PrintGCDateStamps 
-Xloggc:../logs/gc.log
-XX:+UseGCLogFileRotation 
-XX:NumberOfGCLogFiles=5 
-XX:GCLogFileSize=100M
```

As shown above, the JVM will rotate the GC log file whenever its size reaches 20MB. It will generate up to five files, with extensions `gc.log.0`,  `gc.log.1`, `gc.log.2`, `gc.log.3`, and `gc.log.4`.

But this approach has a few challenges:

### a.Losing Old GC Logs

Suppose you configured  `-XX:NumberOfGCLogFiles=5`, then over a period of time, five GC log files will be created:

- gc.log.0 ← oldest GC Log content
- gc.log.1
- gc.log.2
- gc.log.3
- gc.log.4 ← latest GC Log content

The most recent GC log contents will be written to `gc.log.4` and old GC log contents will be present in `gc.log.0`.

When the application starts to generate more GC logs than the configured  `-XX:NumberOfGCLogFiles`, in this case, five, then old GC log contents in `gc.log.0` will be deleted. New GC events will be written to  `gc.log.0`. It means that you will end up not having all the generated GC logs. You will lose the visibility of all events.

### b.Mixed-Up GC Logs

Suppose an application has created five GC log files, including:

- gc.log.0
- gc.log.1
- gc.log.2
- gc.log.3
- gc.log.4

Then, let’s say you are restarting the application. Now, new GC logs will be written to `gc.log.0` file and old GC log content will be present in `gc.log.1`, `gc.log.2`, `gc.log.3`, `gc.log.4`, etc.

- gc.log.0 ← GC log file content after restart
- gc.log.1 ← GC log file content before restart
- gc.log.2 ← GC log file content before restart
- gc.log.3 ← GC log file content before restart
- gc.log.4 ← GC log file content before restart

So, your new GC log contents get mixed up with old GC logs. Thus, to mitigate this problem, you might have to move all the old GC logs to a different folder before you restart the application.

### c.Forwarding GC Logs to a Central Location

In this approach, the current active file to which GC logs are written is marked with the extension  `.current`. For example, if GC events are currently written to the file `gc.log.3`, it would be named as: `gc.log.3.current`.

If you want to forward GC logs from each server to a central location, then most DevOps engineers use  `rsyslog`. However, this file naming convention poses a significant challenge to use `rsyslog`, as [described in this blog](https://www.planetcobalt.net/sdb/forward_gc_logs.shtml).

### d.Tooling

Now, to analyze the GC log file using the GC tools such as ([GCeasy](https://gceasy.io/), GCViewer, etc.), you will have to upload multiple GC log files instead of just one single GC Log file.

## Recommended Solution

We can suffix the GC log file with the time stamp at which the JVM was restarted, then the GC Log file locations will become unique. Then, new GC logs will not override the old GC logs. It can be achieved by suffixing `%t` to the GC log file name, as shown below:

```txt
-XX:+PrintGCDetails 
-XX:+PrintGCDateStamps 
-Xloggc:../logs/gc-%t.log
```

`%t` suffixes timestamp to the GC log file in the format:  `YYYY-MM-DD_HH-MM-SS`. So, the generated GC log file name will start to look like: `gc-2019-01-29_20-41-47.log`.

This simple solution addresses all the shortcomings of `-XX:+UseGCLogFileRotation`.

[参考原文](https://dzone.com/articles/try-to-avoid-xxusegclogfilerotation)
