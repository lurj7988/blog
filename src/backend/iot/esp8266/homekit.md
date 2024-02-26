---
title: HomeKit
icon: markdown
order: 2
date: 2024-01-23
category:
  - 物联网
tag:
  - esp8266
---

## Introduction

[HomeKit](https://developer.apple.com/homekit/) is a framework developed by Apple for communicating with and controlling connected accessories in a user’s home using iOS devices.
ESP HomeKit SDK has been developed in-house by Espressif to build Apple HomeKit compatible accessories using ESP32/ESP32-S2/ESP32-C3/ESP8266 SoCs.

> Note: If you want to use HomeKit for commercial products, please check [here](https://www.espressif.com/en/products/sdks/esp-homekit-sdk) for access to the MFi variant of this SDK. It has the exact same APIs as this and so, moving to it should be easy. However, commercial HomeKit products can be built only with ESP32/ESP32-S2/ESP32-C3 since ESP8266 cannot meet all the HomeKit Certification requirements.
> If you want to use a port of Apple's ADK instead, please check [here](https://github.com/espressif/esp-apple-homekit-adk)

Features of this SDK:

* Easy APIs to implement all standard HomeKit profiles defined by Apple.
* Facility to add customised accessory specific Services and Characteristics.
* Samples (Fan, Lightbulb, Outlet, Bridge, Data-TLV8, Ethernet) to enable quick accessory development.
* Support for ESP Unified Provisioning.

## Get Started

### Set up Host environment

Set up the host environment and ESP IDF (**master** branch) as per the steps given [here](https://docs.espressif.com/projects/esp-idf/en/latest/get-started/index.html).

If you are using **ESP8266**, set-up ESP8266-RTOS-SDK (**master** branch) as per the steps given [here](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/).

### Get esp-homekit-sdk

Please clone this repository using the below command:

```shell
git clone --recursive https://github.com/espressif/esp-homekit-sdk.git
```

> Note the --recursive option. This is required to pull in the JSON dependencies into esp-homekit-sdk. In case you have already cloned the repository without this option, execute this to pull in the submodules:
> `git submodule update --init --recursive`
>
> If you had already cloned the repository and submodules earlier, you may have to execute `git submodule sync --recursive` once since the submodule paths have changed.

### Compile and Flash

You can use esp-homekit-sdk with any ESP32, ESP32-S2, ESP32-C3 or ESP8266 board (though we have tested only with the ESP32-DevKit-C, ESP32-S2-Saola-1,  ESP32-C3-DevKit-M-1, ESP8266-DevKit-C). We have provided multiple examples for reference. Compile and flash as below (fan used as example):

#### For ESP32/ESP32-S2/ESP32-C3**

```shell
cd /path/to/esp-homekit-sdk/examples/fan
export ESPPORT=/dev/ttyUSB0 #Set your board's serial port here
idf.py set-target <esp32/esp32s2/esp32c3>
idf.py flash monitor
```

#### For ESP8266

```shell
cd /path/to/esp-homekit-sdk/examples/fan
export ESPPORT=/dev/ttyUSB0 #Set your board's serial port here
make defconfig
make flash monitor
make erase_flash
```

> Note the `partitions_hap.csv` for ESP8266 is different from the one for ESP32/ESP32-S2/ESP32-C3. Please use the correct one.

::: warning ESP8266 Partition Table

```txt
# Name,   Type, SubType, Offset,  Size, Flags
# Note: if you change the phy_init or app partition offset, make sure to change the offset in Kconfig.projbuild
nvs,      data, nvs,     0x9000,  0x6000,
phy_init, data, phy,     0xf000,  0x1000,
factory,  app,  factory, 0x10000, 1M,
```

:::

::: warning ESP32/ESP32-S2/ESP32-C3 Partition Table

```txt
# Name,   Type, SubType, Offset,  Size, Flags
# Note: Firmware partition offset needs to be 64K aligned, initial 36K (9 sectors) are reserved for bootloader and partition table
sec_cert,  0x3F, ,0xd000,    0x3000, ,  # Never mark this as an encrypted partition
nvs,      data, nvs,     0x10000,   0x6000,
otadata,  data, ota,     ,          0x2000
phy_init, data, phy,     ,          0x1000,
ota_0,    app,  ota_0,   0x20000,   1600K,
ota_1,    app,  ota_1,   ,          1600K,
factory_nvs, data,   nvs,     0x340000,  0x6000
nvs_keys, data, nvs_keys,0x346000,  0x1000
```

:::

As the device boots up, you will see two QR codes, a small one for HomeKit and a larger one for Wi-Fi provisioning. Please use any of the [Espressif Provisioning Apps](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/provisioning/provisioning.html#provisioning-tools) for Wi-Fi provisioning.

> Note: For the Open source HomeKit SDK, the HomeKit QR code cannot be used for provisioning from the Home app. It can be used only for pairing, after the Wi-Fi provisioning is done. For provisioning from Home app, you will need the MFi variant of the SDK.
> Note: If you want to use hard-coded credentials instead of Provisioning, please set the ssid and passphrase by navigating to `idf.py menuconfig -> App Wi-Fi -> Source of Wi-Fi Credentials -> Use Hardcoded`

After the device connects to your Home Wi-Fi network it can be added in the Home app

### Add acccessory in the Home app

Open the Home app on your iPhone/iPad and follow these steps

* Tap on "Add Accessory" and scan the small QR code mentioned above.
* If QR code is not visible correctly, you may use the link printed on the serial terminal or follow these steps:
  * Choose the "I Don't Have a Code or Cannot Scan" option.
  * Tap on "Esp-Fan-xxxxxx" in the list of Nearby Accessories.
  * Select the "Add Anyway" option for the "Uncertified Accessory" prompt.
  * Enter 11122333 as the Setup code.
* You should eventually see the "Esp-Fan-xxxxxx added" message.
* Give a custom name, assign to a room, create scenes as required and you are done.

> For ESP8266, the pairing may take a bit longer.

## FAQ

> 1. Question: [此设备已经被添加到其他家庭](https://github.com/DaMiBear/ESP32_HomeKit_AirConditioner/issues/2)

Answer:

1. use `idf.py erase_flash` to erase the `ESP32` flash, then flash the firmware again.
2. use `make erase_flash` to erase the `ESP8266` flash, then flash the firmware again.
