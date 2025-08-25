// internal/http/router.go
package router

import (
	"meli-backend/internal/domain"
	"meli-backend/internal/http/handlers"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ItemService interface {
	GetEnriched(string) (*domain.Item, error)
}

type Deps struct {
	ItemService ItemService
}

type Router struct {
	engine *gin.Engine
	deps   Deps
}

func NewRouter(deps Deps) *Router {
	gin.SetMode(gin.ReleaseMode)

	engine := gin.New()
	engine.Use(gin.Logger())
	engine.Use(gin.Recovery())
	engine.Use(corsMiddleware())

	r := &Router{
		engine: engine,
		deps:   deps,
	}
	r.setupRoutes()
	return r
}

func (r *Router) Handler() http.Handler {
	return r.engine
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

func (r *Router) setupRoutes() {
	r.engine.GET("/health", r.healthCheckHandler)

	v1 := r.engine.Group("/api/v1")
	{
		itemHandler := handlers.NewItemHandler(r.deps.ItemService)

		v1.GET("/items/:id", itemHandler.GetByID)
	}

	r.engine.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "route not found",
		})
	})
}

func (r *Router) healthCheckHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Server is running",
		"version": "1.0.0",
	})
}
