package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MessageList {
    Region country;
    List<Region> dept0;
    List<Region> dept1;
    List<Region> dept2;
    List<Region> dept3;

}
