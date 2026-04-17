#!/bin/sh

sigint_handler()
{
  kill $PID
  exit
}

trap sigint_handler SIGINT

function watch() {
		fswatch -1 -r -e '.git/*' -e '.jj/*' .
}

while true; do
	if ! go build -o /tmp/website .; then
		watch
	  continue
	fi
	/tmp/website $@ &
	PID=$!
	watch
	kill $PID
done
