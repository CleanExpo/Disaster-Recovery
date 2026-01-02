# Google Tag Manager Configuration Guide

## Overview

This guide provides step-by-step instructions for configuring Google Tag Manager (GTM) for the NRPG platform.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Tags Configuration](#tags-configuration)
3. [Triggers](#triggers)
4. [Variables](#variables)
5. [Import Configuration](#import-configuration)
6. [Testing](#testing)

---

## Initial Setup

### 1. Create GTM Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Account Name: `NRPG`
4. Container Name: `NRPG Website`
5. Target Platform: `Web`

### 2. Install Container

The container is already installed in the app via `AnalyticsProvider`. Just add the GTM ID to your environment:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## Tags Configuration

### GA4 Configuration Tag

**Tag Name**: GA4 Configuration
**Tag Type**: Google Analytics: GA4 Configuration

**Configuration**:
- Measurement ID: `{{GA4 Measurement ID}}` (constant variable)
- Configuration Settings:
  - Send a page view event when this configuration loads: `false` (we handle this manually)
  - Enable Enhanced Measurement: See table below

**Enhanced Measurement Settings**:
| Setting | Enabled |
|---------|---------|
| Page views | ❌ (handled manually) |
| Scrolls | ✅ |
| Outbound clicks | ✅ |
| Site search | ✅ |
| Video engagement | ✅ |
| File downloads | ✅ |

**Trigger**: All Pages

---

### Custom Event Tags

#### 1. Claim Started Event

**Tag Name**: GA4 - Claim Started
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `claim_started`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | claim_type | `{{DLV - claim_type}}` |
  | claim_value | `{{DLV - claim_value}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - claim_started

---

#### 2. Claim Step Completed Event

**Tag Name**: GA4 - Claim Step Completed
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `claim_step_completed`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | claim_id | `{{DLV - claim_id}}` |
  | step_name | `{{DLV - step_name}}` |
  | step_number | `{{DLV - step_number}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - claim_step_completed

---

#### 3. Claim Submitted Event (Conversion)

**Tag Name**: GA4 - Claim Submitted
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `claim_submitted`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | claim_id | `{{DLV - claim_id}}` |
  | claim_type | `{{DLV - claim_type}}` |
  | claim_value | `{{DLV - claim_value}}` |
  | value | `{{DLV - claim_value}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - claim_submitted

---

#### 4. Contractor Inquiry Event

**Tag Name**: GA4 - Contractor Inquiry
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `contractor_inquiry`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | contractor_id | `{{DLV - contractor_id}}` |
  | contractor_name | `{{DLV - contractor_name}}` |
  | service_type | `{{DLV - service_type}}` |
  | location | `{{DLV - location}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - contractor_inquiry

---

#### 5. Contractor Signup Started Event

**Tag Name**: GA4 - Contractor Signup Started
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `contractor_signup_started`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | service_type | `{{DLV - service_type}}` |
  | location | `{{DLV - location}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - contractor_signup_started

---

#### 6. Contractor Signup Completed Event (Conversion)

**Tag Name**: GA4 - Contractor Signup Completed
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `contractor_signup_completed`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | contractor_id | `{{DLV - contractor_id}}` |
  | service_type | `{{DLV - service_type}}` |
  | location | `{{DLV - location}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - contractor_signup_completed

---

#### 7. Content Download Event

**Tag Name**: GA4 - Content Download
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `content_download`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | content_id | `{{DLV - content_id}}` |
  | content_name | `{{DLV - content_name}}` |
  | content_type | `{{DLV - content_type}}` |
  | file_type | `{{DLV - file_type}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - content_download

---

#### 8. Tool Interaction Event

**Tag Name**: GA4 - Tool Interaction
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `tool_interaction`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | tool_name | `{{DLV - tool_name}}` |
  | tool_action | `{{DLV - tool_action}}` |
  | tool_value | `{{DLV - tool_value}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - tool_interaction

---

#### 9. CTA Clicked Event

**Tag Name**: GA4 - CTA Clicked
**Tag Type**: Google Analytics: GA4 Event

**Configuration**:
- Configuration Tag: `{{GA4 Configuration}}`
- Event Name: `cta_clicked`
- Event Parameters:
  | Parameter Name | Value |
  |----------------|-------|
  | cta_name | `{{DLV - cta_name}}` |
  | cta_location | `{{DLV - cta_location}}` |
  | event_category | `{{DLV - event_category}}` |
  | event_label | `{{DLV - event_label}}` |

**Trigger**: Custom Event - cta_clicked

---

## Triggers

### Built-in Triggers

1. **All Pages**
   - Type: Page View
   - Trigger: All Pages

2. **DOM Ready**
   - Type: DOM Ready
   - Trigger: All Pages

### Custom Event Triggers

Create triggers for each custom event:

| Trigger Name | Type | Condition |
|-------------|------|-----------|
| CE - claim_started | Custom Event | Event equals `claim_started` |
| CE - claim_step_completed | Custom Event | Event equals `claim_step_completed` |
| CE - claim_submitted | Custom Event | Event equals `claim_submitted` |
| CE - contractor_inquiry | Custom Event | Event equals `contractor_inquiry` |
| CE - contractor_signup_started | Custom Event | Event equals `contractor_signup_started` |
| CE - contractor_signup_completed | Custom Event | Event equals `contractor_signup_completed` |
| CE - content_download | Custom Event | Event equals `content_download` |
| CE - tool_interaction | Custom Event | Event equals `tool_interaction` |
| CE - cta_clicked | Custom Event | Event equals `cta_clicked` |
| CE - search | Custom Event | Event equals `search` |
| CE - sign_up | Custom Event | Event equals `sign_up` |
| CE - login | Custom Event | Event equals `login` |

---

## Variables

### User-Defined Variables

#### Constants

| Variable Name | Type | Value |
|--------------|------|-------|
| GA4 Measurement ID | Constant | G-XXXXXXXXXX |

#### Data Layer Variables

Create these Data Layer Variables:

| Variable Name | Data Layer Variable Name | Default Value |
|--------------|-------------------------|---------------|
| DLV - claim_id | claim_id | undefined |
| DLV - claim_type | claim_type | undefined |
| DLV - claim_value | claim_value | 0 |
| DLV - step_name | step_name | undefined |
| DLV - step_number | step_number | 0 |
| DLV - contractor_id | contractor_id | undefined |
| DLV - contractor_name | contractor_name | undefined |
| DLV - service_type | service_type | undefined |
| DLV - location | location | undefined |
| DLV - content_id | content_id | undefined |
| DLV - content_name | content_name | undefined |
| DLV - content_type | content_type | undefined |
| DLV - file_type | file_type | undefined |
| DLV - tool_name | tool_name | undefined |
| DLV - tool_action | tool_action | undefined |
| DLV - tool_value | tool_value | undefined |
| DLV - cta_name | cta_name | undefined |
| DLV - cta_location | cta_location | undefined |
| DLV - search_term | search_term | undefined |
| DLV - event_category | event_category | undefined |
| DLV - event_label | event_label | undefined |

---

## Import Configuration

### Export from Existing Container

If you have an existing container, you can export the configuration:

1. Go to Admin > Export Container
2. Choose version
3. Download JSON file

### Import Template

You can create a container template JSON file with all tags, triggers, and variables configured. This can be shared across environments.

**Container Template Structure**:

```json
{
  "exportFormatVersion": 2,
  "exportTime": "2026-01-02 12:00:00",
  "containerVersion": {
    "path": "accounts/XXXXX/containers/XXXXX/versions/1",
    "accountId": "XXXXX",
    "containerId": "XXXXX",
    "containerVersionId": "1",
    "container": {
      "path": "accounts/XXXXX/containers/XXXXX",
      "accountId": "XXXXX",
      "containerId": "XXXXX",
      "name": "NRPG Website",
      "publicId": "GTM-XXXXXXX",
      "usageContext": ["WEB"]
    },
    "tag": [
      // Tags configuration
    ],
    "trigger": [
      // Triggers configuration
    ],
    "variable": [
      // Variables configuration
    ]
  }
}
```

---

## Testing

### Preview Mode

1. Click "Preview" in GTM workspace
2. Enter your website URL
3. GTM debugger will open

### Verification Checklist

- [ ] GA4 Configuration tag fires on all pages
- [ ] Custom event tags fire on correct triggers
- [ ] Data Layer variables populate correctly
- [ ] No tag errors in preview mode
- [ ] Events appear in GA4 DebugView
- [ ] All event parameters captured

### Tag Assistant

1. Install [Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Enable extension
3. Visit your website
4. Check for:
   - Tags firing
   - Data layer pushes
   - Error messages

---

## Publishing

### Version Control

1. Name version: `v1.0.0 - Initial GA4 Setup`
2. Add description: List all tags, triggers, variables added
3. Publish

### Workspace Management

- Create separate workspaces for major changes
- Use descriptive names
- Regular cleanup of old workspaces

---

## Maintenance

### Regular Tasks

- **Monthly**: Review tag performance
- **Quarterly**: Audit event tracking
- **Annually**: Full implementation review

### Updates

When adding new events:
1. Update analytics library
2. Create GTM tag
3. Create GTM trigger
4. Add data layer variables
5. Test in preview mode
6. Publish with version notes

---

## Best Practices

1. **Naming Conventions**
   - Tags: `GA4 - Event Name`
   - Triggers: `CE - event_name` (Custom Event)
   - Variables: `DLV - variable_name` (Data Layer Variable)

2. **Organization**
   - Use folders for related tags
   - Group by event category
   - Consistent naming

3. **Documentation**
   - Add notes to tags
   - Document changes in version description
   - Keep this guide updated

4. **Testing**
   - Always test in preview mode
   - Verify in GA4 DebugView
   - Check for errors before publishing

---

## Support

### Resources
- [GTM Help Center](https://support.google.com/tagmanager)
- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/bd-p/Google_Tag_Manager)

### Contact
- GTM Administrator: analytics@nrpg.com.au
- Technical Support: tech@nrpg.com.au

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
