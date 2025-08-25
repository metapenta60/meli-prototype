package domain

import "time"

type Question struct {
	ID        string
	Question  string
	Answer    string
	CreatedAt time.Time
}
