package domain

type MainSpecItem struct {
	Item         string `json:"item"`
	Value        string `json:"value"`
	ImageIconURL string `json:"image_icon_url"`
}

type SecondarySpecItem struct {
	Item   string               `json:"item"`
	Values []SecondarySpecValue `json:"values"`
}

type SecondarySpecValue struct {
	Item  string
	Value string
}
