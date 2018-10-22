CC := socat
FLAGS := -d -d
PORT1 := /tmp/ttyV0
PORT2 := /tmp/ttyV1

all:
	$(CC) $(FLAGS) pty,raw,echo=0,link=$(PORT1) pty,raw,echo=0,link=$(PORT1)

.PHONY: clean
install:
	apt-get update && sudo apt-get install socat
	apt-get update && sudo apt-get install nodejs
