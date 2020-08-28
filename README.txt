This is a comprehensive guide on how to set up the SleepySurvey website on a local machine
1) Download and install node (https://nodejs.org/en/download/)
2) Download git (https://git-scm.com/downloads)
3) Open the terminal and clone the repository down from github `git clone https://github.com/sleepyboy123/SleepySurvey.git`
4) Change directory into the terminal `cd SleepySurvey`
5) Install dependencies `npm install`
6) Start website `npm start` (After the initial setup, you can just navigate to the directory and run this command to start the website)
7) Find the IP Address of your host machine. For windows, `ipconfig` For Mac `ifconfig`. You are looking for an IPv4 Address. If there are multiple addresses just try them all. It looks like 172.16.0.126
8) On your test machines, open the browser and go to <IP Address>:3000 (172.16.0.126:3000)




The results are stored on firebase. 
1) Login to gmail using sleepysurvey123@gmail.command and Asdasd123%
2) Go to https://firebase.google.com/
3) Click on `Go to console` at the top right hand corner (Make sure you are in the sleepysurvey gmail)
4) Click on the sleepysurvey project
5) In the sidebar, click on Develop > Cloud Firestore
6) Your data can be viewed by clicking on the different documents in the middle column. (I can work on printing this into a table)