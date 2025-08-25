package dto

type ReviewDTO struct {
	Rating  int    `json:"rating"`
	Comment string `json:"comment"`
	Date    string `json:"date"` // ej. "08 ago. 2025"
}
