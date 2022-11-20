import btmgmt
import re

def main():
    exit_code, data = btmgmt.command_str("find")
    
    next_string = re.findall(r"\w\w:\w\w:\w\w:\w\w:\w\w:\w\w .* rssi -\d\d", data)

    next_string2 = map(lambda x: re.findall(r"(\w\w:\w\w:\w\w:\w\w:\w\w:\w\w) .* rssi (-\d\d)", x), next_string)

    next_string3 = list(map(lambda x: {"addr": x[0][0], "rssi": x[0][1]}, next_string2))
    print(next_string3)


if __name__ == "__main__":
    main()


