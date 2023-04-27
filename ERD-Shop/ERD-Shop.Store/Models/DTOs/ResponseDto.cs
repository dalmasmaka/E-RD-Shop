namespace ERD_Shop.Store.Models.DTOs
{
    public class ResponseDto
    {
        public bool isSuccess { get; set; } = true;
        public object? Result { get; set; }
        public string DisplayMessage { get; set; } = "";
        public List<string>? ErrorMessage { get; set; }
    }
}
