package main
import (
   "fmt"
   "net/http"
   "github.com/gorilla/mux"
   "encoding/csv"
   "os"
   "encoding/json"
   "strconv"
)

type Response struct {
	Code   string `json:"code"`
	Data Data `json:"data"`
}
type ResponseError struct {
	Code   string `json:"code"`
	Message string `json:"message"`
}

type Data struct {
	
	Total int `json:"total"`
	Records []CSVRow `json:"records"`
}

type CSVRow struct {
	ID   int `json:"ID"`
	Name string `json:"Name"`
	Age int `json:"Age"`
	Team string `json:"Team"`
}

func main() {
	handleRequest()
}

func getFileHandler(w http.ResponseWriter, r *http.Request) { 

	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("id:", id)
	file, err := os.Open("doc/"+ id +".csv")
	if err != nil {
		fmt.Println("file Error:", err)
		responseData := ResponseError{
			Code: "error",
			Message: "no such file or directory",
		}
	
		jsonData, err := json.Marshal(responseData)
		if err != nil {
			http.Error(w, "Error converting to JSON", http.StatusInternalServerError)
			return
		}
	
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsonData)
	}
	defer file.Close()

	reader := csv.NewReader(file)

	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("records Error:", err)
		return
	}
	
	var data []CSVRow
	for index, record := range records {
		// fmt.Println(index)
		if index >0 {
			id, err := strconv.Atoi(record[0])
			if err != nil {
				fmt.Println("id Error:", err)
			}
			age, err := strconv.Atoi(record[2])
			if err != nil {
				fmt.Println("age Error:", err)
			}

			row := CSVRow{
				ID:   id,
				Name: record[1],
				Age: age,
				Team: record[3],
			}
			data = append(data, row)
		}
	}

	responseData := Response{
		Code: "success",
		Data: Data{
			Total:  len(records)-1,
			Records: data,
		},
	}

	jsonData, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, "Error converting to JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
    
}
func handleRequest() { 
	r := mux.NewRouter()
    r.HandleFunc("/file/{id:[0-9]+}", getFileHandler).Methods("GET")
	fmt.Println("Server is running on :8080")
    http.ListenAndServe(":8080", r) 
}