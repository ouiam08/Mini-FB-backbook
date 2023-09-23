package fstg.irisi.miniFb.domain.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCommand {
    private int id;
    private String name;
    private String password;
    private String description;
}
