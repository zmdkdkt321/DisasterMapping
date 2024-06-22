package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegionWithMessageDto {
    private String name;
    private String content;
    private String date;
}
