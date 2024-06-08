package team.men4.dsmap.service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Region {
    private String name;
    private List<MessageDto> messageList;
}
