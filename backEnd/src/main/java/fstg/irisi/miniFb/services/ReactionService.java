package fstg.irisi.miniFb.services;

import fstg.irisi.miniFb.domain.command.ReactionCommand;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.ReactionMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.Reaction;
import fstg.irisi.miniFb.domain.repositories.ReactionRepository;
import fstg.irisi.miniFb.domain.representations.ReactionRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final ReactionMapper reactionMapper;
    private final UserMapper userMapper;
    private final PostMapper postMapper;


    public List<ReactionRepresentation> getAll() {
        return reactionMapper.convertToReactionRepresentationList(reactionRepository.findAll());
    }

    public List<ReactionRepresentation> getByPostId(int postId) {
        return reactionMapper.convertToReactionRepresentationList(reactionRepository.findReactionByPostId(postId));
    }
    public List<ReactionRepresentation> getByPostIdUserId(int postId, int userId){
        return reactionMapper.convertToReactionRepresentationList(reactionRepository.findReactionByPostIdUserId(postId,userId));
    }

    public int create(ReactionCommand reactionCommand) {
        Reaction reaction = new Reaction();
        reaction.setReactingUser(userMapper.convertToUser(reactionCommand.getUser()));
        reaction.setPostReaction(postMapper.convertToPost(reactionCommand.getPost()));
        reaction.setReactionType(reactionCommand.getType());
        reactionRepository.save(reaction);
        return reaction.getReactionId();
    }

    public ReactionRepresentation update(ReactionCommand reactionCommand) {
        Reaction existingReaction = reactionRepository.findById(reactionCommand.getId())
                .orElseThrow(() -> new IllegalArgumentException("reaction.not.found with id" + reactionCommand.getId()));

        existingReaction.setReactionType(reactionCommand.getType());
        reactionRepository.save(existingReaction);
        return reactionMapper.convertToReactionRepresentation(existingReaction);
    }


    public String delete(int reactionId) {
        if (reactionId != 0) {
            reactionRepository.deleteById(reactionId);
        }
        return "Reaction deleted!";
    }

}
