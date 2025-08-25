package dto

type QuestionDTO struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
	Date     string `json:"date"` // ej. "20/08/2025"
}
