from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

username = "test8"
email = "test8@gmail.com"
password = "qwerty"

url = "http://ncaters-frontend-app-env.eba-jvmmawxf.ap-southeast-2.elasticbeanstalk.com/login"

driver = webdriver.Chrome()
time.sleep(1)
driver.get(url)
time.sleep(1)


emailInputElement = driver.find_element(By.NAME, "email")
passwordInputElement = driver.find_element(By.NAME, "password")



time.sleep(1)
emailInputElement.send_keys(email)
time.sleep(1)
passwordInputElement.send_keys(password)


loginButtonElement = driver.find_element(By.NAME, "login")
loginButtonElement.click()
time.sleep(1)
driver.get("http://ncaters-frontend-app-env.eba-jvmmawxf.ap-southeast-2.elasticbeanstalk.com/dashboard")




time.sleep(10)
driver.close()