package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.men4.dsmap.model.User;
import team.men4.dsmap.service.UserService;

@Controller
@RequestMapping("/test")
public class TestController {

        @Autowired
        UserService userService;

        @GetMapping("/body")
        @ResponseBody
        public String testReturnMessageBody() {
                return "return message";
        }

        @GetMapping("/view")
        public String testReturnView() {
                return "view";
        }

        @ResponseBody
        @GetMapping("/select")
        public User select(){
                return userService.select();
        }

}

