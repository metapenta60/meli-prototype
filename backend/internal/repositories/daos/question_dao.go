package daos

import (
	"meli-backend/internal/domain"
	"time"

	"github.com/samber/lo"
)

type QuestionsDAO []QuestionDAO

type QuestionDAO struct {
	ID        string    `gorm:"type:uuid;primaryKey;column:id"`
	ItemID    string    `gorm:"type:uuid;column:item_id;not null"`
	Question  string    `gorm:"column:question;not null"`
	Answer    string    `gorm:"column:answer"`
	CreatedAt time.Time `gorm:"column:created_at;default:now()"`
}

func (QuestionDAO) TableName() string {
	return "questions"
}

func (q *QuestionDAO) ToDomain() *domain.Question {
	return &domain.Question{
		ID:        q.ID,
		Question:  q.Question,
		Answer:    q.Answer,
		CreatedAt: q.CreatedAt,
	}
}

func (q QuestionsDAO) ToDomain() []domain.Question {
	return lo.Map(q, func(item QuestionDAO, _ int) domain.Question {
		return *item.ToDomain()
	})
}
