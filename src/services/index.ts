import { Application } from '../declarations';
import securityUser from './security/user/user.service';
import securityRole from './security/role/role.service';
import securitySession from './security/session/session.service';
import storageFile from './storage/file/file.service';
import storageSignature from './storage/signature/signature.service';
import dataTag from './data/tag/tag.service';
import contentArticle from './content/article/article.service';
import contentPlaylist from './content/playlist/playlist.service';
import contentPlaylistItem from './content/playlist-item/playlist-item.service';
import securityVerification from './security/verification/verification.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(securityUser);
  app.configure(securityRole);
  app.configure(securitySession);
  app.configure(storageFile);
  app.configure(storageSignature);
  app.configure(dataTag);
  app.configure(contentArticle);
  app.configure(contentPlaylist);
  app.configure(contentPlaylistItem);
  app.configure(securityVerification);
}
