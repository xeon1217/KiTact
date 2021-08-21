package com.kitact.controller;

import com.kitact.data.model.Restaurant;
import com.kitact.repository.RestaurantRepository;
import com.kitact.service.RestaurantService;
import com.kitact.data.dto.RestaurantEnrollDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
    private final RestaurantRepository restaurantRepository;
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantRepository restaurantRepository, RestaurantService restaurantService) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantService = restaurantService;
    }

    // show restaurant
    @GetMapping("/user")
    List<Restaurant> all() {
        return restaurantRepository.findAll();
    }

    // enroll restaurant
    @PostMapping("/admin")
    public String enrollRestaurant(@RequestBody RestaurantEnrollDto restaurantEnrollDTO) {
        restaurantService.enrollRestaurant(restaurantEnrollDTO);
        return "redirect:/";
    }
}