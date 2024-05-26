package team.men4.dsmap.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String content;
    private LocalDateTime date;
    private Region region;

    public Message(String content, LocalDateTime date) {
        this.content = content;
        this.date = date;
    }
}
