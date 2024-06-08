package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageDto {
    private int id;
    private String message;
    private String date;
    private String time;
}
