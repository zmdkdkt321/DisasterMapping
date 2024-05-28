package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team.men4.dsmap.model.User;
import team.men4.dsmap.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/db")
public class ConnTestController {
    @Autowired
    UserService userService;

    @GetMapping("/insert")
    public void insert(@ModelAttribute User user){ userService.insert(user); }

    @GetMapping("/update")
    public void update(@ModelAttribute User user){ userService.update(user); }

    @GetMapping("/delete")
    public void delete(@RequestParam long id){ userService.delete(id); }
}
