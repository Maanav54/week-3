package com.example.myapp;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class Share {
    @GetMapping("/notion")
    public String getMethodName() {
        return "https://steady-shawl-7c0.notion.site/CRUD-OPERATIONS-2eeff9567a0780938a56cd1b4320a553?pvs=73";
    }
    
    @PostMapping("/doc")
    public Map<Object,Object> doc(){
        Map<Object,Object> res=new HashMap<>();

        res.put("msg","Java Full stack");
        res.put("sucess",true);
        res.put("url","https://wormhole.app/J97lLD#aNBN1D9EudwiPTkA1jtFdg");
        

        return res;
    }
    

}
