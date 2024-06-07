package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.service.SseService;
import team.men4.dsmap.service.TotalService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/total")
public class TotalController {
    @Autowired
    private TotalService totalService;



    @GetMapping("/all")
    public List<Total> selectAll(){
        return totalService.selectTotal();
    }

    @GetMapping("/{lv1_name}/{lv2_name}/{lv3_name}")
    public int select(@PathVariable String lv1_name,
                        @PathVariable String lv2_name,
                        @PathVariable String lv3_name
                        )
    {
        log.info(String.format("%s %s %s", lv1_name, lv2_name, lv3_name));
        Region region = new Region(lv1_name, lv2_name, lv3_name);
        return totalService.selectTotalByRegion(region);
    }

}
