package team.men4.dsmap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class TestController {

        @GetMapping("/body")
        @ResponseBody
        public String testReturnMessageBody() {
                return "return message";
        }

        @GetMapping("/view")
        public String testReturnView() {
                return "view";
        }

}

