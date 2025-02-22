package fstg.irisi.miniFb.domain.representations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRepresentation {
    private int id;
    private byte[] photo;
    private String body;
    private UserRepresentation user;
    private String time;
    private int nbreComment;
    private int nbreReaction;
}
