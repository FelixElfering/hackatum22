import re
import btmgmt
from http.server import HTTPServer, BaseHTTPRequestHandler
from flask import Flask, request
import RPi.GPIO as GPIO

app = Flask(__name__)

def send_proximity():
    print("Beginning send_proximity")
    exit_code, data = btmgmt.command_str("--timeout", "3", "find")
    #print(f"{data=}")

    next_string = re.findall(r"\w\w:\w\w:\w\w:\w\w:\w\w:\w\w .* rssi -\d\d", data)

    next_string2 = map(lambda x: re.findall(r"(\w\w:\w\w:\w\w:\w\w:\w\w:\w\w) .* rssi (-\d\d)", x), next_string)

    next_string3 = list(map(lambda x: {"addr": x[0][0], "rssi": x[0][1]}, next_string2))
    #print(f"{next_string3=}")
    print("End proximity")
    return next_string3

def setupGPIO():
    print("GPIO")
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

    GPIO.setup(17, GPIO.OUT)

def controlLED(user_input):
    try:
        if user_input== 1:
            GPIO.output(17, GPIO.HIGH)
            print("LED is on")
        elif user_input== 0:
            GPIO.output(17, GPIO.LOW)
            print("LED is off")
    except:
        GPIO.cleanup()
        print("")


def send_temp():
    print("begin temp")
    cpu_temp = gz.CPUTemperature().temperature
    print(f"{cpu_temp=}")
    print("end temp")
    return str(cpu_temp)    


@app.get('/api/proximity')
def proximity():
    setupGPIO()
    return send_proximity()

@app.get('/api/temp')
def temp():
    return send_temp()

@app.get('/api/activate')
def activate():
    print("Hey I'm in the activate function")
    return controlLED(1)

@app.get('/api/deactivate')
def deactivate():
    return controlLED(0)
