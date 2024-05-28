package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.service.CoordinateService;
import team.men4.dsmap.service.TotalService;

import java.util.List;

@RestController
@RequestMapping("/cord")
public class CoordinateController {

    @Autowired
    private CoordinateService coordinateService;

    @GetMapping("/1")
    public List<Region> selectAll(){
        return coordinateService.selectCorLv1();
    }

    @GetMapping("/2")
    public List<Region> selectAl(){
        return coordinateService.selectCorLv2();
    }

}
