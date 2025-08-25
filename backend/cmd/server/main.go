package main

import (
	"log"
	"meli-backend/internal/http/router"
	"meli-backend/internal/repositories"
	"meli-backend/internal/service"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default values")
	}

	server := initializeServer()
	defer server.Close()

	port := getPort()
	log.Printf("Server starting on port %s", port)

	server.Addr = ":" + port

	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func initializeServer() *http.Server {
	// Initialize database connection
	dbWrapper, err := repositories.NewDbWrapper(
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize repositories
	itemsRepository := repositories.New(dbWrapper)

	// Initialize services
	itemService := service.NewItemService(itemsRepository)

	// Initialize router with dependencies
	routerInstance := router.NewRouter(router.Deps{
		ItemService: itemService,
	})

	return &http.Server{
		Handler: routerInstance.Handler(),
	}
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return port
}
