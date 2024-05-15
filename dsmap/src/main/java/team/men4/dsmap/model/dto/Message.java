package team.men4.dsmap.model.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class Message {
    private int id;
    private String message;
    private Date date;
}
