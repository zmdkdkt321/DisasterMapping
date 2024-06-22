package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team.men4.dsmap.model.entity.RegionWithMessage;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageListDto {
    private int offset;
    private int size;
    List<RegionWithMessageDto> messages;
}
