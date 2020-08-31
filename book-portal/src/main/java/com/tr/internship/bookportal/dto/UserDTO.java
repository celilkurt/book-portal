package com.tr.internship.bookportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir kullanıcı adı giriniz")
    @Email
    private String username;

    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir şifre giriniz")
    private String password;

    public UserDTO(String username,String password){
        this.username = username;
        this.password = password;
    }

}
