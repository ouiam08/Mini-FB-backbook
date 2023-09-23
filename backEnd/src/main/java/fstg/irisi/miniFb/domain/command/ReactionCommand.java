package fstg.irisi.miniFb.domain.command;

import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
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