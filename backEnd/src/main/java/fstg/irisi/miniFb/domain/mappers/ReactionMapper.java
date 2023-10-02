package fstg.irisi.miniFb.domain.mappers;

import fstg.irisi.miniFb.domain.model.Reaction;
import fstg.irisi.miniFb.domain.representations.ReactionRepresentation;
import lombok.Builder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Builder
public class ReactionMapper {
    private UserMapper userMapper;
    private PostMapper postMapper;

    public List<ReactionRepresentation> convertToReactionRepresentationList(List<Reaction> reactionList) {
        List<ReactionRepresentation> representations = new ArrayList<>();

        for (Reaction reaction : reactionList) {
            representations.add(
                    ReactionRepresentation.builder()
                            .id(reaction.getReactionId())
                            .user(userMapper.convertToUserRepresentation(reaction.getReactingUser()))
                            .post(postMapper.convertToPostRepresentation(reaction.getPostReaction()))
                            .type(reaction.getReactionType())
                            .build()
            );
        }
        return representations;
    }

    public ReactionRepresentation convertToReactionRepresentation(Reaction reaction) {
        return ReactionRepresentation.builder()
                .id(reaction.getReactionId())
                .type(reaction.getReactionType())
                .post(postMapper.convertToPostRepresentation(reaction.getPostReaction()))
                .user(userMapper.convertToUserRepresentation(reaction.getReactingUser()))
                .build();
    }


}

