all:
	socat -d -d pty,raw,echo=0,link=/tmp/ttyV0 pty,raw,echo=0,link=/tmp/ttyV1

.PHONY: clean
install:
	apt-get update && sudo apt-get install socat
	apt-get update && sudo apt-get install nodejs

run:
	node arduino-simulation.js
