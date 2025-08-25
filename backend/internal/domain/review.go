package domain

import "time"

type Review struct {
	ID        string
	Rating    int
	Content   string
	CreatedAt time.Time
}
