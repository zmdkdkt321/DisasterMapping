package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.men4.dsmap.model.entity.Message;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegionWithMessagesDTO {
    private int id;
    private String name;
    private double x;
    private double y;

    List<Message> messages;
}
