package main

import (
	"fmt"
	"net/http"
	"net/http/cgi"
	"strings"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if q := r.URL.Query().Get("q"); q != "" && !strings.Contains(strings.ToLower(q), "status") {
			fmt.Print(q)
		}

		flag, err := r.Cookie("FLAG")
		if err != nil {
			fmt.Fprint(w, "Hello gophers👋")
		} else {
			fmt.Fprint(w, flag.Value)
		}
	})

	cgi.Serve(nil)
}
