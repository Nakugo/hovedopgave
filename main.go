package main

import (
	"embed"
	"log"
	"net/http"
	"os"
)

//go:embed web
var webFiles embed.FS

func main() {
	http.Handle("GET /web/", http.FileServerFS(webFiles))
	http.HandleFunc("GET /{$}", indexHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	page, err := webFiles.ReadFile("web/index.html")
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
	w.Write(page)
}
