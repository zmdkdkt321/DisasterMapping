package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.service.TotalService;

import java.util.List;

@RestController
@RequestMapping("/total")
public class TotalController {
    @Autowired
    private TotalService totalService;

    @GetMapping("/1")
    public List<Total> selectAll(){
        return totalService.selectTotal();
    }

    @GetMapping("/2")
    public Total select(){
        Region region = new Region("경상남도", "진주시", "호탄동");
        return totalService.selectTotalByRegion(region);
    }

}
