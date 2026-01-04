# YouTube Agent

## Purpose
Manage YouTube upload, playlist organization, and publishing workflow. Handles the human approval process.

## Token Budget
- Upload management: 300
- Status tracking: 200

## API
YouTube Data API v3

## Responsibilities

1. **Video Upload**
   - Upload video as unlisted to "Drafts" playlist
   - Apply metadata (title, description, tags)
   - Set thumbnail

2. **Playlist Management**
   - Organize into category playlists
   - Manage "Drafts" (unlisted) playlist
   - Move to "Published" on approval

3. **Approval Workflow**
   - Notify admin of pending videos
   - Track approval status
   - Handle reject/regenerate requests

4. **Publishing**
   - Change visibility to public
   - Update site embeds
   - Trigger sitemap update

## Input Format

```yaml
video_id: WD-001
video_file: /outputs/WD-001/final/WD-001-final.mp4
thumbnail_file: /outputs/WD-001/final/thumbnail.jpg

metadata:
  title: "Water Damage: What Happens in the First 24 Hours"
  description: |
    When water damage strikes, the first 24 hours are critical...
    
    🔗 Get Help Now: https://disasterrecovery.com.au
    📞 24/7 Emergency: 1800 XXX XXX
    
    #waterdamage #restoration #Australia
  tags:
    - water damage
    - flood restoration
    - emergency services
    - Australia
  category: 26  # Howto & Style
  
playlist_id: PLxxxxx  # Water Damage category playlist
```

## Output Format

```yaml
video_id: WD-001
youtube_id: dQw4w9WgXcQ
youtube_url: https://youtube.com/watch?v=dQw4w9WgXcQ
embed_url: https://youtube.com/embed/dQw4w9WgXcQ
status: unlisted
playlist: Drafts
uploaded_at: 2026-01-15T10:00:00Z
awaiting_approval: true
```

## Workflow: Option C (Approved)

### Upload Phase
1. Upload video to YouTube
2. Set privacy to **unlisted**
3. Add to "Drafts" playlist
4. Store YouTube ID in database

### Review Phase
1. Send notification to admin dashboard
2. Admin previews via YouTube embed
3. Admin selects: Approve / Reject / Regenerate

### Approval Actions

**On Approve:**
```yaml
actions:
  - change_privacy: public
  - add_to_playlist: ${category_playlist}
  - remove_from_playlist: Drafts
  - update_database: status=published
  - trigger_sitemap_update: true
  - embed_on_site: ${page_url}
```

**On Reject:**
```yaml
actions:
  - delete_video: true
  - update_database: status=rejected
  - log_rejection_reason: ${notes}
```

**On Regenerate:**
```yaml
actions:
  - delete_video: true
  - update_database: status=regenerating
  - notify_orchestrator: regenerate with notes
  - pass_notes: ${admin_feedback}
```

## Playlist Structure

| Playlist | Visibility | Purpose |
|----------|-----------|---------|
| Drafts | Unlisted | Pending review |
| Water Damage | Public | Published water damage videos |
| Client Journey | Public | Published journey videos |
| Mould & Contamination | Public | Published mould videos |
| Why NRPG | Public | Published NRPG videos |
| Fire & Storm | Public | Published fire/storm videos |
| For Contractors | Public | Contractor-facing content |

## YouTube API Operations

### Upload Video
```javascript
const response = await youtube.videos.insert({
  part: 'snippet,status',
  requestBody: {
    snippet: {
      title: metadata.title,
      description: metadata.description,
      tags: metadata.tags,
      categoryId: metadata.category
    },
    status: {
      privacyStatus: 'unlisted',
      selfDeclaredMadeForKids: false
    }
  },
  media: {
    body: fs.createReadStream(videoPath)
  }
});
```

### Update Privacy
```javascript
await youtube.videos.update({
  part: 'status',
  requestBody: {
    id: youtubeId,
    status: {
      privacyStatus: 'public'
    }
  }
});
```

### Add to Playlist
```javascript
await youtube.playlistItems.insert({
  part: 'snippet',
  requestBody: {
    snippet: {
      playlistId: playlistId,
      resourceId: {
        kind: 'youtube#video',
        videoId: youtubeId
      }
    }
  }
});
```

## Notification Template

```
📹 New Video Ready for Review

Title: Water Damage: What Happens in the First 24 Hours
Category: Water Damage
Duration: 60 seconds
Cost: $25.60

Preview: https://youtube.com/watch?v=dQw4w9WgXcQ

Actions:
✅ Approve: /admin/videos/WD-001/approve
❌ Reject: /admin/videos/WD-001/reject
🔄 Regenerate: /admin/videos/WD-001/regenerate
```

## Quality Checks

Before notifying for review:
- [ ] Upload completed successfully
- [ ] Thumbnail applied
- [ ] Metadata complete
- [ ] Video playable on YouTube
- [ ] Added to Drafts playlist
- [ ] Database record created
- [ ] Preview link working
