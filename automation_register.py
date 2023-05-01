from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

username = "test9"
email = "test9@gmail.com"
password = "qwerty"

url = "http://ncaters-frontend-app-env.eba-jvmmawxf.ap-southeast-2.elasticbeanstalk.com/"

driver = webdriver.Chrome()

driver.get(url)

registerElement = driver.find_element(By.NAME, "register")
time.sleep(1)
registerElement.click()
usernameInputElement = driver.find_element(By.NAME, "username")
emailInputElement = driver.find_element(By.NAME, "email")
passwordInputElement = driver.find_element(By.NAME, "password")
usernameInputElement.send_keys(username)
time.sleep(1)
emailInputElement.send_keys(email)
time.sleep(1)
passwordInputElement.send_keys(password)
submitButtonElement = driver.find_element(By.NAME, "submit")

submitButtonElement.click()
time.sleep(1)
driver.get("http://ncaters-frontend-app-env.eba-jvmmawxf.ap-southeast-2.elasticbeanstalk.com/dashboard")
time.sleep(1)

time.sleep(10)
driver.close()