test_string = """hci0 dev_found: 0C:2A:23:5D:BF:7A type LE Random rssi -72 flags 0x0004
AD flags 0x00
eir_len 28
hci0 dev_found: 61:5B:29:3A:4D:98 type LE Random rssi -35 flags 0x0000
AD flags 0x1a
eir_len 17
hci0 dev_found: 2E:FD:72:5D:05:70 type LE Random rssi -61 flags 0x0004
AD flags 0x00
eir_len 29
hci0 dev_found: 46:8A:10:E0:5D:44 type LE Random rssi -72 flags 0x0004
AD flags 0x00
eir_len 31
hci0 dev_found: 43:78:07:C1:CC:DD type LE Random rssi -78 flags 0x0000
AD flags 0x1a
eir_len 18
hci0 dev_found: 5D:0D:80:ED:44:C8 type LE Random rssi -84 flags 0x0000
AD flags 0x00
name LE_WH-1000XM5
hci0 dev_found: 90:F1:57:03:D0:7F type LE Public rssi -76 flags 0x0000
AD flags 0x06
eir_len 9
hci0 dev_found: 4A:8F:36:70:C7:D4 type LE Random rssi -63 flags 0x0000
AD flags 0x1a
eir_len 31
hci0 dev_found: EC:9E:ED:9E:BB:63 type LE Random rssi -80 flags 0x0004
AD flags 0x00
eir_len 8
hci0 dev_found: 3C:C0:1D:45:B2:99 type LE Random rssi -73 flags 0x0004
AD flags 0x00
eir_len 31
hci0 dev_found: 6E:11:1B:7B:7E:7C type LE Random rssi -85 flags 0x0000
AD flags 0x1a
eir_len 19
hci0 dev_found: 2A:50:62:DD:77:C4 type LE Random rssi -71 flags 0x0004
AD flags 0x1a
eir_len 15
hci0 dev_found: 1A:73:9C:41:00:DB type LE Random rssi -72 flags 0x0004
AD flags 0x00
eir_len 28
hci0 dev_found: 76:C2:28:CE:75:66 type LE Random rssi -83 flags 0x0000
AD flags 0x1a
eir_len 31
hci0 dev_found: 4D:21:B8:1A:5E:9B type LE Random rssi -78 flags 0x0004
AD flags 0x00
eir_len 31
hci0 dev_found: 4B:41:23:CB:38:47 type LE Random rssi -70 flags 0x0004
AD flags 0x00
eir_len 31
hci0 dev_found: 68:03:BC:3A:94:7F type LE Random rssi -63 flags 0x0000
AD flags 0x1a
eir_len 19
hci0 dev_found: 48:BC:52:AF:4A:30 type LE Random rssi -76 flags 0x0000
AD flags 0x1a
eir_len 19
hci0 dev_found: 28:11:A5:51:C3:4A type LE Public rssi -69 flags 0x0000
AD flags 0x1a
eir_len 18
hci0 dev_found: 17:E4:81:21:F8:7C type LE Random rssi -76 flags 0x0004
AD flags 0x1a
eir_len 15
hci0 dev_found: 42:21:0B:3A:D0:B2 type LE Random rssi -58 flags 0x0004
AD flags 0x00
eir_len 31
hci0 dev_found: 4C:D4:0B:53:AE:3A type LE Random rssi -82 flags 0x0000
AD flags 0x1a
eir_len 17
hci0 dev_found: 88:C6:26:B0:39:BB type LE Public rssi -57 flags 0x0000
AD flags 0x1a"""

import re
next_string = re.findall(r"\w\w:\w\w:\w\w:\w\w:\w\w:\w\w .* rssi -\d\d", data)

print(f"{next_string=}")

next_string2 = map(lambda x: re.findall(r"(\w\w:\w\w:\w\w:\w\w:\w\w:\w\w) .* rssi (-\d\d)", x), next_string)

# print(f"{list(next_string2)=}")

next_string3 = list(map(lambda x: {"addr": x[0][0], "rssi": x[0][1]}, next_string2))

print(f"{next_string3=}")
