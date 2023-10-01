package fstg.irisi.miniFb.domain.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReactionCommand {
    private int id;
    private UserCommand user;
    private PostCommand post;
    private String type;
}