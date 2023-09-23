package fstg.irisi.miniFb.domain.mappers;

import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import lombok.Builder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Builder
public class UserMapper {
    public UserRepresentation convertToUserRepresentation(FBUser user) {
        return UserRepresentation.builder()
                .id(user.getUserId())
                .description(user.getUserDescription())
                .name(user.getUserName())
                .password(user.getUserPassword())
                .build();
    }

    public FBUser convertToUser(UserCommand user) {
        return FBUser.builder()
                .userId(user.getId())
                .userDescription(user.getDescription())
                .userPassword(user.getPassword())
                .userName(user.getName())
                .build();
    }

}
