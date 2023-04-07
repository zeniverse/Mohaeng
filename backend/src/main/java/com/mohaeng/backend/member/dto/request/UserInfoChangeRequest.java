package com.mohaeng.backend.member.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserInfoChangeRequest {
    private String nickName;
}
