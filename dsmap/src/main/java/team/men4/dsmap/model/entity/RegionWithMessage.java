package team.men4.dsmap.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class RegionWithMessage {
    private String lv1Name;
    private String lv2Name;
    private String lv3Name;
    private String content;
    private LocalDateTime date;

    public RegionWithMessage() {
    }
}