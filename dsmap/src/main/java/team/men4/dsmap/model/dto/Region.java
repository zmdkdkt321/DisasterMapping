package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Region {
    private String name;
    private List<Message> messageList;
}
